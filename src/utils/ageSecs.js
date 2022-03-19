const ageSecs = (dateString) => {
    const createDate = new Date(dateString);
    const now = new Date();
    return (now.getTime() - createDate.getTime()) / 1000;
};

module.exports = ageSecs;
