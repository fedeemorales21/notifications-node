const WP_PUBLIC = 'BB4u4SpcaC69gTXi7yaS16PT4HvSZe5yyWy_5dRQQnDEUTRfOMIKob6vPVqW_gyavn5UJy22UtijT3K8ZdLQYlE'

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
   
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
   
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

const sub = async () => {

    try {

        const registerSW = await navigator.serviceWorker.register('/sw.js',{
            scope: '/'
        })
        
    
        const subscription = await registerSW.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(WP_PUBLIC)
        })
     
    
        await fetch('/sub', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        
    } catch (error) {
        console.log(error)
    }
    
}

const form = document.getElementById('sendPush')
form.addEventListener('submit',async e => {
    e.preventDefault()
    await fetch('/custom', {
        method: 'POST',
        body: JSON.stringify({
            title: form['title'].value,
            message: form['message'].value
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    })
})

if ("serviceWorker" in navigator) {
  sub().catch(err => console.log(err));
}