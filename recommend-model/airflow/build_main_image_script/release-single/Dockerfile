# sudo docker exec -it airflow-instance /bin/bash
FROM bytetrade/airflow_base_image
ENV BASE_PATH /opt/recommend-model
ENV FOR_AIRFLOW YES
RUN mkdir -p $BASE_PATH
RUN pip install apache-airflow==2.5.3
ENV MODEL_PATH /opt/model
VOLUME [$MODEL_PATH]
COPY recommend-model/ $BASE_PATH/
COPY recommend-model/airflow/config/release-single/airflow.cfg /root/airflow/
ENV AIRFLOW_HOME=/root/airflow
WORKDIR $AIRFLOW_HOME 
RUN airflow db init
RUN airflow users create \
--username release-single \
--firstname recommend \
--lastname bytetrade \
--role Admin \
--password bytetrade \
--email zouwangzhong@bytetrade.io

EXPOSE 8080
CMD ["sh", "-c", "airflow webserver -p 8080 | airflow scheduler"]
