import unittest

from proto_class.proto_convert_tool import ProtoConvertTool
class ProtoConvertToolUnitTest(unittest.TestCase):
    def test_convert(self):
        # python  -m unittest proto_convert_tool_unit_test.ProtoConvertToolUnitTest.test_convert
        tool = ProtoConvertTool()
        tool.convert("embedding.proto")