export const getBalanceData= async({mess,authTokens})=>{
    let response = await fetch(`/api/balance/${mess.id}`,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+ String(authTokens.access)
        }
    })
    let data = await response.json()
    localStorage.setItem('balance',JSON.stringify(data))
    return data
  }