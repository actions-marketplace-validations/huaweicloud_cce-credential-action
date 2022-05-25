# cce-credential-action
云容器引擎（Cloud Container Engine，简称CCE）提供高度可扩展的、高性能的企业级Kubernetes集群，支持运行Docker容器。借助云容器引擎，您可以在华为云上轻松部署、管理和扩展容器化应用程序。  
本Action会检测当前环境是否安装了kubectl,如果没有安装，则会安装最新stable的kubectl，然后通过AK/SK和projectid,cluster等信息获取到用户在CCE上创建的CCE集群的Credentials，配置到当前环境中，为后续的集群部署，更新等操作提供鉴权

## **前置工作**
(1).创建CCE集群,详情请参考CCE文档:https://support.huaweicloud.com/cce/index.html  
(2).获取华为云用户的AK/SK和project_id,详情请参考 https://support.huaweicloud.com/apm_faq/apm_03_0001.html  
(3).获取CCE集群的集群ID,获取方法:点击CCE集群进入CCE详情页面,然后拷贝左上角的 集群ID  
(4).由于要从外网github上访问华为云CCE集群，需要为集群创建并绑定弹性公网IP

## **参数说明:**
ak:华为访问密钥即AK，必填  
sk:访问密钥即SK，必填  
region:当前CCE集群所在的region，必填  
project_id:当前用户所在region的project_id，必填  
cluster_id:CCE集群的集群ID，必填  

## **使用样例**
样例说明:通过cce-credential-action@v1.0.0获取到cce集群的kubeconfig,然后通过这个kubeconfig来操作CCE集群
```yaml
- name: get CCE Cluster Credentials
  uses: huaweicloud/cce-credential-action@v1.0.0
  with:
     ak: ${{ secrets.ACCESSKEY }}
     sk: ${{ secrets.SECRETACCESSKEY }}
     region: "cn-north-4"
     project_id: "0dd8cb413000906a2fcdc019b5a84546"
     cluster_id: "f288d212-d299-11ec-8e06-0255ac101534"

- name: get CCE Cluster info
      - run: |
          kubectl version --client --short
          kubectl config view
          kubectl cluster-info
          kubectl get pod,svc --all-namespaces
```