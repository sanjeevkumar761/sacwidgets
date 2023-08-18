# Planung
Copilot for SAP Cloud Analytics.

**Deploy to Azure Container Apps:**
az acr create --resource-group sacwidgets-container-app \
 --name <name of container registry> --sku Basic  

az extension add --source https://workerappscliextension.blob.core.windows.net/azure-cli-extension/containerapp-0.2.0-py2.py3-none-any.whl  

export RESOURCE_GROUP=sacwidgets-container-app  
export LOCATION=northeurope  
export LOG_ANALYTICS_WORKSPACE=sacwidgetsloganalytics  
export CONTAINERAPPS_ENVIRONMENT=container-app-env  

LOG_ANALYTICS_WORKSPACE_CLIENT_ID=`az monitor log-analytics workspace show --query customerId -g $RESOURCE_GROUP -n $LOG_ANALYTICS_WORKSPACE --out tsv`  

LOG_ANALYTICS_WORKSPACE_CLIENT_SECRET=`az monitor log-analytics workspace get-shared-keys --query primarySharedKey -g $RESOURCE_GROUP -n  
$LOG_ANALYTICS_WORKSPACE --out tsv`

az containerapp create \  
--name sac-widgets-app \  
--resource-group $RESOURCE_GROUP \  
--environment $CONTAINERAPPS_ENVIRONMENT \  
--image "docker.io/saneevkumar761/sacwidgets" --target-port 3000 --ingress 'external' --query configuration.ingress.fqdn  

**Add Planung widget to SAP Cloud Analytics Story**

**Configure OpenAI API Key**

**Run Planning Scenario**

