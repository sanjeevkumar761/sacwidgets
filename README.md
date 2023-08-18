# Planung
Copilot for SAP Cloud Analytics.

**Deploy to Azure Container Apps:**
az acr create --resource-group sacwidgets-container-app \
 --name "name of container registry" --sku Basic  

az extension add --source https://workerappscliextension.blob.core.windows.net/azure-cli-extension/containerapp-0.2.0-py2.py3-none-any.whl  

export RESOURCE_GROUP="name of resource group"  
export LOCATION="Azure region"  
export LOG_ANALYTICS_WORKSPACE="name of Azure Log Analytics Workspace"  
export CONTAINERAPPS_ENVIRONMENT="name of container app environment" 

LOG_ANALYTICS_WORKSPACE_CLIENT_ID=`az monitor log-analytics workspace show --query customerId -g $RESOURCE_GROUP -n $LOG_ANALYTICS_WORKSPACE --out tsv`  

LOG_ANALYTICS_WORKSPACE_CLIENT_SECRET=`az monitor log-analytics workspace get-shared-keys --query primarySharedKey -g $RESOURCE_GROUP -n  
$LOG_ANALYTICS_WORKSPACE --out tsv`

az containerapp create \  
--name "name of container app" \  
--resource-group $RESOURCE_GROUP \  
--environment $CONTAINERAPPS_ENVIRONMENT \  
--image "docker.io/"name of your docker hub user"/"name of your dockerhub repository" --target-port 3000 --ingress 'external' --query configuration.ingress.fqdn  

**Add Planung widget to SAP Cloud Analytics (SAC) Story**  
Login to SAC and navigate to Analytic Applications menu. Upload your custom widget json file.  

**Configure OpenAI API Key**  
Go to Stories menu in SAC and add your widget to a story. Configure OpenAI API key in Builder properties of widget.  

**Run Planning Scenario**  
Switch to view mode of the Story in SAC and enter prompt to create a planning scenario.  
