const validValues = ['true', true, '1', 1];

const isTrue = value => {
    let val = value;

    if (typeof value === 'string') {
        val = val.toLowerCase();
    }

    return validValues.includes(val);
};

module.exports = isTrue;
