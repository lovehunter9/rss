import os
import unittest
from common_util.common_tool import CommonTool
from common_util.model_tool import ModelTool


class ModelToolUnitTest(unittest.TestCase):
    def test_validate_model(self):
        # python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_validate_model
        common_tool = CommonTool()
        model_tool = ModelTool()
        management_path = os.path.join(os.path.join(os.path.join(common_tool.get_project_directory(),"resources"),"model_management"),"model_management.json")
        model_tool.validate_model_management_file(management_path)
        model_name = ""
    
        