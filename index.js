const height = document.getElementById("height");
const weight = document.getElementById("weight");
const rad = document.getElementById("rad");
const radText = document.getElementById("rad text");
const HSelect = document.getElementById("select h");
const WSelect = document.getElementById("select w");
const btn = document.getElementById("btn");

btn.onclick = () => {
    let heightVal = height.value;
    let weightVal = weight.value;

    if (HSelect.value === "ft") {
        let feet, inches;
        if (heightVal.includes("'")) {
            [feet, inches] = heightVal.split("'");
            feet = parseInt(feet);
            inches = parseInt(inches);
        } else {
            feet = parseInt(heightVal);
            inches = 0;
        }
        heightVal = (feet * 30.48) + (inches * 2.54);
    }
    if (WSelect.value === "lb") {
        weightVal = weightVal * 0.45359237;
    }

    if (isNaN(heightVal) || isNaN(weightVal)) {
        radText.textContent = `Please enter valid numbers for height and weight`;
    } else if (
        typeof heightVal === "string" &&
        heightVal.trim().length === 0
    ) {
        radText.textContent = `enter your status`;
    } else {
        const res = calcBMI(heightVal, weightVal);
        res.weightType();
        rad.style = `--value: ${res.progress()};--size: 17rem`;
    }
};

const calcBMI = (height, weight) => {
    let heightM = height / 100;
    let bmi = weight / (heightM * heightM);
    bmi = bmi.toFixed(2);
    const weightType = () => {
        if (!isNaN(bmi)) {
            if (bmi < 18.5) {
                radText.textContent = `${bmi}\nUnderweight`;
                rad.className = "radial-progress font-bold text-2xl rotate-[270deg] m-auto transition-all duration-200 text-blue-400";
            } else if (bmi >= 18.5 && bmi < 25) {
                radText.textContent = `${bmi}\nNormal`;
                rad.className = "radial-progress font-bold text-2xl rotate-[270deg] m-auto transition-all duration-200 text-green-400";
            } else if (bmi >= 25 && bmi < 30) {
                radText.textContent = `${bmi}\nOverweight`;
                rad.className = "radial-progress font-bold text-2xl rotate-[270deg] m-auto transition-all duration-200 text-yellow-400";
            } else {
                radText.textContent = `${bmi}\nObese`;
                rad.className = "radial-progress font-bold text-2xl rotate-[270deg] m-auto transition-all duration-200 text-red-400";
            }
        } else {
            console.log("error");
        }
    };
    const progress = () => {
        if (!isNaN(bmi)) {
            if (bmi > 50) {
                return 50;
            }
            return bmi;
        } else {
            console.log("error");
        }
    };
    return {
        bmi: bmi,
        progress: progress,
        weightType: weightType,
    };
};
