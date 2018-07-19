
```bash
kubectl create namespace monitoring
kubectl create -f 1-prometheus-clusterrole.yaml --save-config
kubectl create -f 2-prometheus-config-map.yaml -n monitoring --save-config
kubectl create -f 3-prometheus-deployment.yaml -n monitoring --save-config
kubectl create -f 4-prometheus-services.yaml -n monitoring --save-config
kubectl create -f 5-prometheus-grafana-configmap.yaml -n monitoring --save-config
kubectl create -f 6-prometheus-grafana-service.yaml -n monitoring --save-config
kubectl create -f 7-prometheus-grafana.yaml -n monitoring --save-config
```

Delete

```bash
kubectl delete -f 7-prometheus-grafana.yaml -n monitoring
kubectl delete -f 6-prometheus-grafana-service.yaml -n monitoring
kubectl delete -f 5-prometheus-grafana-configmap.yaml -n monitoring
kubectl delete -f 4-prometheus-services.yaml -n monitoring
kubectl delete -f 3-prometheus-deployment.yaml -n monitoring
kubectl delete -f 2-prometheus-config-map.yaml -n monitoring
kubectl delete -f 1-prometheus-clusterrole.yaml -n monitoring
```