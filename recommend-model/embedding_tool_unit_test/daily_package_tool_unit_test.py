import unittest
import zlib
from google.protobuf.json_format import Parse, ParseDict,MessageToDict
import proto_class.embedding_pb2 

from embedding.daily_package_tool import DailyPackageTool
from common_util.aws_s3_tool import AWSS3Tool

class DailyPackageToolUnitTest(unittest.TestCase):
    def test_generate_protobuf_package(self):
        # python  -m unittest daily_package_tool_unit_test.DailyPackageToolUnitTest.test_generate_protobuf_package
        daily_package_tool = DailyPackageTool("/home/ubuntu/download_s3")
        daily_package_tool.generate_protobuf_package("word2vec_google","v1",10000)
    
    def test_generate_protobuf_package_and_upload_to_s3(self):
        # python  -m unittest daily_package_tool_unit_test.DailyPackageToolUnitTest.test_generate_protobuf_package_and_upload_to_s3
        daily_package_tool = DailyPackageTool("/home/ubuntu/download_s3")
        for current_limit_number in daily_package_tool.get_latest_support_package_number():
            daily_package_tool.generate_protobuf_package_and_upload_to_s3("word2vec_google","v1",current_limit_number)
    
    def  test_generate_protobuf_package_and_upload_to_s3_word2vec_goolge_v2(self):
        # python  -m unittest daily_package_tool_unit_test.DailyPackageToolUnitTest.test_generate_protobuf_package_and_upload_to_s3_word2vec_goolge_v2
        daily_package_tool = DailyPackageTool("/home/ubuntu/download_s3")
        for current_limit_number in daily_package_tool.get_latest_support_package_number():
            daily_package_tool.generate_protobuf_package_and_upload_to_s3("word2vec_google","v2",current_limit_number)
    
    def test_download_latest_package(self):
        # python  -m unittest daily_package_tool_unit_test.DailyPackageToolUnitTest.test_download_latest_package
        daily_package_tool = DailyPackageTool("/home/ubuntu/download_s3")
        current_package_bytes = daily_package_tool.download_latest_article_embedding_package("word2vec_google","v1",1000)
        decompress_bytes = zlib.decompress(current_package_bytes)
        current_latest_package = proto_class.embedding_pb2.LatestPackage()
        current_latest_package.ParseFromString(decompress_bytes)
        print(MessageToDict(current_latest_package))
    
    def test_download_latest_word2vec_google_v2(self):
        # python  -m unittest daily_package_tool_unit_test.DailyPackageToolUnitTest.test_download_latest_word2vec_google_v2
        daily_package_tool = DailyPackageTool("/home/ubuntu/download_s3")
        current_package_bytes = daily_package_tool.download_latest_article_embedding_package("word2vec_google","v2",1000)
    
    def test_latest_package_header(self):
        # python  -m unittest daily_package_tool_unit_test.DailyPackageToolUnitTest.test_latest_package_header
        daily_package_tool = DailyPackageTool("/home/ubuntu/download_s3")
        aws_tool = AWSS3Tool()
        model_name = "word2vec_google"
        model_version = "v1"
        latest_number = 1000
        latest_package_key = f'{model_name}_{model_version}_latest_package_{latest_number}'
        print(aws_tool.get_object_header('gpu-model-data',latest_package_key))
    
    
    def test_generate_feed_package(self):
        # python  -m unittest daily_package_tool_unit_test.DailyPackageToolUnitTest.test_generate_feed_package
        daily_package_tool = DailyPackageTool("/home/ubuntu/download_s3")
        daily_package_tool.generate_feed_package()
    
    def test_generate_feed_package_and_upload_to_s3(self):
        # python  -m unittest daily_package_tool_unit_test.DailyPackageToolUnitTest.test_generate_feed_package_and_upload_to_s3
        daily_package_tool = DailyPackageTool("/home/ubuntu/download_s3")
        daily_package_tool.generate_feed_package_and_upload_to_s3()