export default async function getIncomesByMonth(year){
   
    let token = localStorage.getItem('access') ? localStorage.getItem('access') : ''
    let data = null
    try {
      let config = {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
        let res = await fetch(`http://localhost:8000/reportes/CommercialOperations/get_incomes_monthly/?year=${year}`, config)
        data = await res.json()
        console.log(data)
        if(res.status == 401){
          console.log("401")
          let refresToken = localStorage.getItem('refresh') ? localStorage.getItem('refresh') : ''
          let res = await fetch(`http://127.0.0.1:8000/refresh-token/`,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              //'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify({'refresh':refresToken})
          })
          if (res.status == 401)
           localStorage.clear()
           else{
          let newTokenAcces = await res.json()
          console.log(newTokenAcces)
          localStorage.setItem('access',newTokenAcces.access);
          config.headers.Authorization = `Bearer ${newTokenAcces.access}`
          let res2 = await fetch(`http://localhost:8000/reportes/CommercialOperations/get_incomes_monthly/?year=${year}`, config)
          data = await res2.json()
           }
        }
        } catch (error) {
        console.log(error);
        data = error
      }
    return data
    }