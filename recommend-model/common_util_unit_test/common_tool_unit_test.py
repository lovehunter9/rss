import os
import unittest
import zlib

from common_util.common_tool import CommonTool

class CommonToolUnitTest(unittest.TestCase):
    def test_read_stop_word_set(self):
        # python  -m unittest common_tool_unit_test.CommonToolUnitTest.test_read_stop_word_set
        common_tool = CommonTool()
        current_set = common_tool.read_stop_word_set('english')
        print(current_set)
        
    def test_read_model_management_file(self):
        # python  -m unittest common_tool_unit_test.CommonToolUnitTest.test_read_model_management_file
        common_tool = CommonTool()
        management_path = os.path.join(os.path.join(os.path.join(common_tool.get_project_directory(),"resources"),"model_management"),"model_management.json")
        current_file = common_tool.read_json(management_path)
        print(current_file)
    
    def test_read_file_bytes(self):
        # python  -m unittest common_tool_unit_test.CommonToolUnitTest.test_read_file_bytes
        common_tool = CommonTool()
        path = "/home/ubuntu/GoogleNews-vectors-negative300.bin"
        # current_file_bytes = common_tool.read_file_bytes(path)
        # print(len(current_file_bytes))
        # compress_bytes = zlib.compress(current_file_bytes)
        # print(len(compress_bytes))
        # https://stackoverflow.com/questions/41827963/track-download-progress-of-s3-file-using-boto3-and-callbacks
        # https://blog.csdn.net/qq_34474071/article/details/123871812
    
    def test_compress_file_gzip_in_same_directory(self):
        # python  -m unittest common_tool_unit_test.CommonToolUnitTest.test_compress_file_gzip_in_same_directory
        common_tool = CommonTool()
        path = "/home/ubuntu/GoogleNews-vectors-negative300.bin"
        common_tool.compress_file_gzip_in_same_directory(path)
    
    def test_compress_file_gzip_second(self):
        # python  -m unittest common_tool_unit_test.CommonToolUnitTest.test_compress_file_gzip_second
        path = "/home/ubuntu/shootout/dictionary"
        common_tool = CommonTool()
        common_tool.compress_file_gzip_in_same_directory(path)
    
    def test_calculate_md5(self):
        # python  -m unittest common_tool_unit_test.CommonToolUnitTest.test_calculate_md5
        # 8b7b50271ba8313eb0816523f2726391
        tfidf_model = '/home/ubuntu/shootout/tfidf.model.gz'
        negative_vec = "/home/ubuntu/GoogleNews-vectors-negative300.bin.gz"
        common_tool = CommonTool()
        print(common_tool.calculate_md5(negative_vec))
        print(common_tool.calculate_md5_for_big_file(negative_vec))