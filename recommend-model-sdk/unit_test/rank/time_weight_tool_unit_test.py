from datetime import datetime,timedelta
import os
import unittest

from recommend_model_sdk.rank.time_weight_decay_tool import TimeWeightDecayTool

class TimeWeightToolUnitTest(unittest.TestCase):
    def test_observe_time_diff(self):
        # python  -m unittest time_weight_tool_unit_test.TimeWeightToolUnitTest.test_observe_time_diff
        time_weight_tool = TimeWeightDecayTool()
        end_time = datetime.now()
        start_time_list = list()
        diff_seconds_list = list()
        new_weight_list = list()
        for current_index in range(1,100):
            start_time = end_time - timedelta(seconds=30*current_index*60)
            diff_seconds_list.append(30*current_index*60)
            new_weight = time_weight_tool.compute(50,start_time,end_time)
            new_weight_list.append(new_weight)
        
        import matplotlib.pyplot as plt
        x= diff_seconds_list
        y= new_weight_list
        plt.plot(x,y)
        plt.xlabel('seconds')
        plt.ylabel('weight')
        plt.title("A simple line graph")
        # plt.show()
        temp_directory = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
        vary_diff_second_path = os.path.join(os.path.join(temp_directory,'temp'),"vary_diff_seconds.png")
        plt.savefig(vary_diff_second_path)