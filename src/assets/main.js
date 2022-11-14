const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCbdSYaPD-lr1kW27UJuk8Pw&part=snippet%2Cid&order=date&maxResults=30';

const content = document.querySelector('#content') || null;

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '6b71ed47b7msh56e397ce8ab670dp1f811fjsn361d5d2949be',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
};

async function fetchData(urlAPI) {
    const response = await fetch(urlAPI, options);
    const json = await response.json();
    return json;
}

(async () => {
    try {
        const videos = await fetchData(API);
        let view = `
        ${videos.items.map(video => `
                <div class="group relative">
                    <div
                        class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                        <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                    </div>
                    <div class="mt-4 flex justify-between">
                        <h3 class="text-sm text-gray-700">
                            <span aria-hidden="true" class="absolute inset-0"></span>
                            ${video.snippet.title}
                        </h3>
                    </div>
                </div>
        `).slice(0, 4).join('')}
        `;
        content.innerHTML = view;
    } catch (error) {
        console.error(error);
    }
})();