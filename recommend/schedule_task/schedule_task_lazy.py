import os
import subprocess
import time

def prepare_install_sdk():
    recommend_dir = os.path.dirname(os.path.dirname(__file__))
    os.chdir(recommend_dir)
    os.system("pip install -e .")
    '''
    install_python_sdk = "pip install -e ."
    while True:
        result_tuple = subprocess.getstatusoutput(install_python_sdk)
        if result_tuple[0] == 0:
            break
        print(f"****init result*** {result_tuple} fail, sleep 60s try again")
        time.sleep(60)
    '''

if __name__ == '__main__':
    start_time = time.time()
    prepare_install_sdk()
    print(f"******************init time {time.time() - start_time}**********")
    run_schedule_task = "python /opt/recommend/schedule_task/schedule_task.py"
    os.system(run_schedule_task)
    # subprocess.getstatusoutput(run_schedule_task)
    # from schedule_task.schedule_task import main
    # main()