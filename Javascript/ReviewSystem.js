const stars = document.querySelectorAll('.star');
const rating = document.getElementById('ratingValue');
const reviewText = document.getElementById('reviewText');
const submitButton = document.getElementById('submitReview');
const reviewsContainer = document.getElementById('reviewList');
const reviewTotalScore = document.getElementById('totalScore');

let totalRatingSum = 0;
let reviewCount = 0;

stars.forEach((star) => {
    star.addEventListener('click', () => {
        const value = parseInt(star.getAttribute('data-value'));
        rating.innerText = value;

        //Remove all existing classes from stars
        stars.forEach((s) => s.classList.remove('one', 'two', 'three', 'four', 'five'));

        //Add class to stars up to the one selected
        stars.forEach((s, index) => {
            if (index < value) {
                s.classList.add(getStarColorClass(value));
            }
        });

        //Remove selected class from all stars
        stars.forEach((s) => s.classList.remove('selected'));
        //Add selected class to the selected star
        star.classList.add('selected');
        });
});

submitButton.addEventListener('click', () => {
    const review = reviewText.value;
    const userRating = parseInt(rating.innerText);

    if (!userRating || !review) {
        alert("Please provide both a rating and a review.");
        return;
    }

    if (userRating > 0) {
        // Update total review count and sum of ratings
        totalRatingSum += userRating;
        reviewCount++;

        //Calculate new score and display it
        const averageScore = (totalRatingSum / reviewCount).toFixed(1);
        reviewTotalScore.innerText = `${averageScore} ⭐`;

        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');
        reviewElement.innerHTML = `<p><strong>Rating : ${userRating}/5</strong></p><p>${review}</p>`;
        reviewsContainer.appendChild(reviewElement);

        // Clear the inputs
        reviewText.value = "";
        rating.innerText = "0";
        stars.forEach((s) => s.classList.remove('one', 'two', 'three', 'four', 'five', 'selected'));
    }
});

function getStarColorClass(value) {
    switch (value) {
        case 1: return 'one';
        case 2: return 'two';
        case 3: return 'three';
        case 4: return 'four';
        case 5: return 'five';
        default: return '';
    }
}
