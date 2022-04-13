export const getDepositData= async({mess,authTokens})=>{
    let response = await fetch(`/api/deposits/${mess.id}`,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+ String(authTokens.access)
        }
    })
    let data = await response.json()
    localStorage.setItem('deposits',JSON.stringify(data))
    return data
  }