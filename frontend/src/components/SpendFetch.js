export const getSpendData= async({mess,authTokens})=>{
    let response = await fetch(`/api/amountspend/${mess.id}`,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+ String(authTokens.access)
        }
    })
    let data = await response.json()
    localStorage.setItem('spends',JSON.stringify(data))
    return data
  }