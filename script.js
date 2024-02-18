// Get the HTML elements with the IDs 'tags' and 'textarea'
const tagsEl = document.getElementById('tags');
const textarea = document.getElementById('textarea');

// Set focus on the textarea when the page is visited
textarea.focus();

// Add an event listener to the textarea for the 'keyup' event
textarea.addEventListener('keyup', function (event) {
    // Call the createTags function with the current value of the textarea
    createTags(event.target.value);

    // If the pressed key is 'Enter'
    if (event.key === 'Enter') {
        // Clear the textarea after a short delay (10 milliseconds)
        setTimeout(() => {
            event.target.value = '';
        }, 10);

        // Call the randomSelect function
        randomSelect();
    }
});

// Function to create tags from the input and display them on the page
function createTags(input) {
    // Split the input by commas, remove empty tags, and trim each tag
    const tags = input.split(',').filter(tag => tag.trim() !== '').map(tag => tag.trim());

    // Clear the previous tags inside the 'tagsEl' element
    tagsEl.innerHTML = '';

    // Create HTML elements for each tag and append them to 'tagsEl'
    tags.forEach(tag => {
        const tagEl = document.createElement('span');
        tagEl.classList.add('tag');
        tagEl.innerText = tag;
        tagsEl.appendChild(tagEl);
    });
}

// Function to randomly select and highlight tags at a regular interval
function randomSelect() {
    // Set the total time (in seconds) for random tag selection
    const time = 30;

    // Set up an interval to repeatedly select and highlight random tags
    const interval = setInterval(() => {
        const randomTag = pickRandomTag();
        highlightTag(randomTag);
        setTimeout(() => {
            unHighlightTag(randomTag);
        }, 100);
    }, 100);

    // Clear the interval after the specified time (in milliseconds)
    setTimeout(() => {
        clearInterval(interval);

        // After clearing the interval, select and highlight a random tag
        setTimeout(() => {
            const randomTag = pickRandomTag();
            highlightTag(randomTag);
        }, 100);

    }, time * 100);
}

// Function to pick a random tag from the list of tags
function pickRandomTag() {
    const tags = document.querySelectorAll('.tag');
    return tags[Math.floor(Math.random() * tags.length)];
}

// Function to highlight a tag by adding a 'highlight' class
function highlightTag(tag) {
    tag.classList.add('highlight');
}

// Function to unhighlight a tag by removing the 'highlight' class
function unHighlightTag(tag) {
    tag.classList.remove('highlight');
}
