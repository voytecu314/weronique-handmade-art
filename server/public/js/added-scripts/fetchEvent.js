async function fetchEvent() {

    try {

        const response = await fetch('https://weronique.onrender.com/upcoming-event/newest');
        const { newest } = await response.json();
        return newest;

    } catch (error) {
        console.log('Event fetch error',err.message);
    }

}