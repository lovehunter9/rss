from distutils.spawn import find_executable
import os
import subprocess
import sys

from common_util.common_tool import CommonTool
from google.protobuf.json_format import Parse, ParseDict, MessageToDict,MessageToJson


class ProtoConvertTool:
    # conda install -c anaconda protobuf
    def __init__(self) -> None:
        self.__common_tool = CommonTool()
        if 'PROTOC' in os.environ and os.path.exists(os.environ['PROTOC']):
            self.protoc = os.environ['PROTOC']
        else:
            self.protoc = find_executable('protoc')
        if self.protoc is None:
            raise ValueError("could not find protoc file")
    
    def convert(self,source_proto_file_name):
        if isinstance(source_proto_file_name,str) is False:
            raise ValueError(f"source_proto_file_name is not str")
        proto_path_dir = os.path.join(os.path.join(self.__common_tool.get_project_directory(),"resources"),"proto_source")
        if os.path.exists(proto_path_dir) is False:
            raise ValueError(f'proto_path_dir {proto_path_dir} is not exist')
        python_out_dir = os.path.join(os.path.join(self.__common_tool.get_project_directory(),"proto_class"))
        protoc_command = [self.protoc,f"--proto_path={proto_path_dir}",f"--python_out={python_out_dir}",source_proto_file_name]
        if subprocess.call(protoc_command) != 0:
            sys.exit(1)
    
    
