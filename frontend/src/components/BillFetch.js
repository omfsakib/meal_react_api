export const getData= async({mess,authTokens})=>{
    let response = await fetch(`/api/bills/${mess.id}`,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+ String(authTokens.access)
        }
    })
    let data = await response.json()
    localStorage.setItem('bills',JSON.stringify(data))
    return data
  }