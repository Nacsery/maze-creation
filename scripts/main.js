const Http = new XMLHttpRequest()

let streamRequest = (__url__, preload = 'none', autoplay = 'false', width = '1280', height = '720') =>{
    let url =`https://web.microsoftstream.com/oembed?url=${__url__}&preload=${preload}&autoplay=${autoplay}&width=${width}&height=${height}`
    console.log(url);
    return url;
}

fetch(streamRequest('https://web.microsoftstream.com/video/a22a6040-3011-4c8e-a49e-6f45466f0eba'),{mode: 'cors'})
.then(response => response.json())
.then(data => console.log(data));

