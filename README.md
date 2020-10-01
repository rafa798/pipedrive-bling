# PIPEDRIVE-BLING
### Objetivo
##### Criar pedidos de venda no Bling a partir de Deals ganhos no Pipedrive.

### Clone
```sh
git clone https://github.com/rafa798/pipedrive-bling.git
```
### Instale e Rode
```sh
cd pipedrive-bling
npm install
cp .env.example .env      " lembre de configurar os TOKENS das APIs "
npm start
```
### Passo a Passo para Criar Pedidos
##### 1 - POST: /user/signup
###### Request
```
body: { firstname, lastName, emailAdress, password }
```
###### Response
```
{ "id": "5f760f8878c8bc3bf3b0d9bf", "isCreated": true}
```
##### 2 - POST: /user/signin
###### Request
```
body: { emailAdress, password }
```
###### Response
```
"token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyoIiwic3ViIjoWVsYWRv..."
```
##### 3 - GET: /order/crm
###### Request
```
header: { Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6Ikic3V...}
```
###### Response
```
{
  "total": 15,
  "succeeded": 15,
  "failed": 0,
  "results": {...}
 }
```
##### OBS:  Os pedidos que já tiverem sido inseridos no Bling anteriormente, não serão inseridos na sua base.
##### 4 - GET: /order/report
###### Request
```
header: { Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6Ikic3V...}
```
###### Response
```
[
  {
    "_id": "01/10/2020",
    "total": 22800.75
  },
  {
    "_id": "06/10/2020",
    "total": 26900.89
  },
  {
    "_id": "30/09/2020",
    "total": 1000.01
  }
]
```
