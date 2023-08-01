package s3action

import (
	"bytes"
	"context"
	"fmt"
	"log"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/feature/s3/manager"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/aws/aws-sdk-go-v2/service/s3/types"
)

type S3action struct {
	S3Client *s3.Client
}

func NewS3action(client *s3.Client) *S3action {
	return &S3action{client}
}

func (action *S3action) GetObject(entryID int64) (string, error) {
	bucket := "gpu-model-data"
	key := fmt.Sprintf("/entry/%d", entryID)
	var partMiBs int64 = 10
	downloader := manager.NewDownloader(action.S3Client, func(d *manager.Downloader) {
		d.PartSize = partMiBs * 1024 * 1024
	})
	buffer := manager.NewWriteAtBuffer([]byte{})
	_, downErr := downloader.Download(context.TODO(), buffer, &s3.GetObjectInput{
		Bucket: aws.String(bucket),
		Key:    aws.String(key),
	})
	if downErr != nil {
		log.Printf("Couldn't download large object from %v:%v. Here's why: %v\n",
			bucket, key, downErr)
	}
	//log.Println("download results:" + string(buffer.Bytes()))
	return string(buffer.Bytes()), downErr
}

func (action *S3action) PutObject(entryID int64, object string) error {
	bucket := "gpu-model-data"
	key := fmt.Sprintf("/entry/%d", entryID)

	largeObject := []byte(object)
	largeBuffer := bytes.NewReader(largeObject)

	_, putErr := action.S3Client.PutObject(context.TODO(), &s3.PutObjectInput{
		Bucket: aws.String(bucket),
		Key:    aws.String(key),
		Body:   largeBuffer,
	})
	if putErr != nil {
		log.Printf("Couldn't upload large object to %v:%v. Here's why: %v\n",
			bucket, key, putErr)
	}

	return putErr
}

func (action *S3action) DeleteObjects(objectKeys []string) error {
	bucket := "gpu-model-data"
	var objectIds []types.ObjectIdentifier
	for _, key := range objectKeys {
		objectIds = append(objectIds, types.ObjectIdentifier{Key: aws.String(key)})
	}
	_, err := action.S3Client.DeleteObjects(context.TODO(), &s3.DeleteObjectsInput{
		Bucket: aws.String(bucket),
		Delete: &types.Delete{Objects: objectIds},
	})
	if err != nil {
		log.Printf("Couldn't delete objects from bucket %v. Here's why: %v\n", bucket, err)
	}
	return err
}
