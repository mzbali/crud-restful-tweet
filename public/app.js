const tweetList = document.querySelector('ul');

tweetList.addEventListener('click', async e => {
    if (e.target.nodeName === 'BUTTON') {
        const id = e.target.value;
        e.target.parentElement.remove();
        await axios.delete(`/tweets/${id}`);
    }
})