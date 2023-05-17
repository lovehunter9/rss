# sudo docker exec -it airflow-instance /bin/bash
FROM bytetrade/airflow_base_image
ENV BASE_PATH /opt/recommend-model
ENV MODEL_PATH /opt/model
# ENV FOR_AIRFLOW YES 
# ENV FOR_AIRFLOW YES
VOLUME [$BASE_PATH,$MODEL_PATH]
WORKDIR $BASE_PATH

RUN pip install apache-airflow==2.5.3

COPY airflow/config/test-single/airflow.cfg /root/airflow/
ENV AIRFLOW_HOME=/root/airflow
#  WORKDIR $AIRFLOW_HOME  is must, before airflow db init
WORKDIR $AIRFLOW_HOME 
RUN airflow db init
RUN airflow users create \
--username test-single \
--firstname recommend \
--lastname bytetrade \
--role Admin \
--password bytetrade \
--email zouwangzhong@bytetrade.io




EXPOSE 8080
CMD ["sh", "-c", "airflow webserver -p 8080 | airflow scheduler"]
