import os
import unittest

from common_util.aws_s3_tool import AWSS3Tool
from common_util.common_tool import CommonTool

class AWSS3ToolUnitTest(unittest.TestCase):
    def test_upload_word2vec_google_v1(self):
        # python  -m unittest aws_s3_tool_unit_test.AWSS3ToolUnitTest.test_upload_word2vec_google_v1
        tool = AWSS3Tool()
        common_tool = CommonTool()
        '''
        1.GoogleNews-vectors-negative300.bin
        2.tfidf.model
        3.dictionary
        '''
        tfidf_path = "/home/ubuntu/shootout/tfidf.model.gz"
        uncompress_tfidf_path = "/home/ubuntu/shootout/tfidf.model"
        uncompress_tfidf_hash = common_tool.calculate_md5_for_big_file(uncompress_tfidf_path)
        
        tfidf_dictionary_path = "/home/ubuntu/shootout/dictionary.gz"
        uncompress_tfidf_dictionary_path = "/home/ubuntu/shootout/dictionary.gz"
        uncompress_tfidf_dictionary_hash = common_tool.calculate_md5_for_big_file(uncompress_tfidf_dictionary_path)
        
        
        
        word2vec_embedding_path = "/home/ubuntu/GoogleNews-vectors-negative300.bin.gz"
        uncompress_word2vec_embedding_path = "/home/ubuntu/GoogleNews-vectors-negative300.bin"
        uncompress_word2vec_embedding_hash = common_tool.calculate_md5_for_big_file(uncompress_word2vec_embedding_path)
        
        prefix = "word2vec_google_v1"
        bucket_name = "gpu-model-data"
        s3_tfidf_key = f'{prefix}_tfidf.model.gz'
        
        tool.upload_file_with_md5(tfidf_path,bucket_name,s3_tfidf_key,uncompress_tfidf_hash)
        s3_tfidf_dictionary_key = f'{prefix}_dictionary.gz'
        tool.upload_file_with_md5(tfidf_dictionary_path,bucket_name,s3_tfidf_dictionary_key,uncompress_tfidf_dictionary_hash)
        
        s3_word2vec_embedding_key = 'GoogleNews-vectors-negative300.bin.gz'
        tool.upload_file_with_md5(word2vec_embedding_path,bucket_name,s3_word2vec_embedding_key,uncompress_word2vec_embedding_hash)
    
    def test_upload_word2vec_goolge_v2(self):
        # python  -m unittest aws_s3_tool_unit_test.AWSS3ToolUnitTest.test_upload_word2vec_goolge_v2
        tool = AWSS3Tool()
        common_tool = CommonTool()
        '''
        1.GoogleNews-vectors-negative300.bin
        2.tfidf.model
        3.dictionary
        '''
        tfidf_path = "/home/ubuntu/shootout/tfidf.model.gz"
        uncompress_tfidf_path = "/home/ubuntu/shootout/tfidf.model"
        uncompress_tfidf_hash = common_tool.calculate_md5_for_big_file(uncompress_tfidf_path)
        
        tfidf_dictionary_path = "/home/ubuntu/shootout/dictionary.gz"
        uncompress_tfidf_dictionary_path = "/home/ubuntu/shootout/dictionary.gz"
        uncompress_tfidf_dictionary_hash = common_tool.calculate_md5_for_big_file(uncompress_tfidf_dictionary_path)
        
        
        

        
        prefix = "word2vec_google_v2"
        bucket_name = "gpu-model-data"
        s3_tfidf_key = f'{prefix}_tfidf.model.gz'
        
        tool.upload_file_with_md5(tfidf_path,bucket_name,s3_tfidf_key,uncompress_tfidf_hash)
        s3_tfidf_dictionary_key = f'{prefix}_dictionary.gz'
        tool.upload_file_with_md5(tfidf_dictionary_path,bucket_name,s3_tfidf_dictionary_key,uncompress_tfidf_dictionary_hash)

    
    
    def test_get_file_size(self):
        # python  -m unittest aws_s3_tool_unit_test.AWSS3ToolUnitTest.test_get_file_size
        tool = AWSS3Tool()
        prefix = "word2vec_google_v1"
        bucket_name = "gpu-model-data"
        s3_tfidf_key = f'{prefix}_tfidf.model.gz'
        s3_word2vec_embedding_key = 'GoogleNews-vectors-negative300.bin.gz'
        total_length = tool.get_file_size(bucket_name,s3_word2vec_embedding_key)
        print(total_length)
        tfidf_model = '/home/ubuntu/shootout/tfidf.model.gz'
        print(os.path.getsize(tfidf_model))
    
    def test_compare_digest(self):
        #  python  -m unittest aws_s3_tool_unit_test.AWSS3ToolUnitTest.test_compare_digest
        tool = AWSS3Tool()
        prefix = "word2vec_google_v1"
        bucket_name = "gpu-model-data"
        s3_tfidf_key = f'{prefix}_tfidf.model.gz'
        s3_word2vec_embedding_key = 'GoogleNews-vectors-negative300.bin.gz'
        print(tool.get_object_header(bucket_name,s3_word2vec_embedding_key))
        common_tool = CommonTool()
        google_vec = "/home/ubuntu/GoogleNews-vectors-negative300.bin.gz"
        print(common_tool.calculate_md5_for_big_file(google_vec))
    
    
        
        
    def test_download_file(self):
        #  python  -m unittest aws_s3_tool_unit_test.AWSS3ToolUnitTest.test_download_file
        tool = AWSS3Tool()
        # local_path = '/home/ubuntu/download_s3/tfidf.model.gz'
        local_path = "/home/ubuntu/GoogleNews-vectors-negative300.bin.gz"
        prefix = "word2vec_google_v1"
        bucket_name = "gpu-model-data"
        s3_tfidf_key = f'{prefix}_tfidf.model.gz'
        tool.download(local_path,bucket_name,s3_tfidf_key)
    
    def test_get_object(self):
         #  #  python  -m unittest aws_s3_tool_unit_test.AWSS3ToolUnitTest.test_get_object
        tool = AWSS3Tool()
        model_name = "word2vec_google"
        model_version = "v1"
        limit_number = "1000"
        bucket_name = "gpu-model-data"

        latest_package_key = f'{model_name}_{model_version}_latest_package_{limit_number}'

        response = tool.get_object_byte(bucket_name,latest_package_key)
        print(response)