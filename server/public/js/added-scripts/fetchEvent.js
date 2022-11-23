async function fetchEvent() {

    try {

        const response = await fetch('http://localhost:5000/upcoming-event/newest');
        const { newest } = await response.json();
        return newest;

    } catch (error) {
        console.log('Event fetch error',err.message);
    }

}