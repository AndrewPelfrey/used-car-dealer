import bcrypt from 'bcrypt';

const enteredPassword = "password"; // What you're entering
const storedHash = "$2b$10$mVJ4QwBjhvBe4Rr8EeweR.vjXWYRrLy01l1p1LMXA88wuAl/fpEfK"; // From database

bcrypt.compare(enteredPassword, storedHash).then((result) => {
    console.log("Password match result:", result);
});
