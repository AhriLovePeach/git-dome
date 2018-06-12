const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
};

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n;
};

const convertToStarsArray = stars => {
    let num = stars.toString().substring(0, 1);
    let array = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= num) {
            array.push(1);
        } else {
            array.push(0);
        }
    }
    return array;
};

const convertToCastString = casts => {
    let name = '';
    for (var i = 0; i < casts.length; i++) {
        name = name + casts[i].name + ' / ';
    }
    return name = name.substring(0, name.length - 3);
}

const convertToCastInfos = casts => {
    let castsArray = [];
    for (var inx in casts) {
        let cast = {
            img: casts[inx].avatars ? casts[inx].avatars.large : '',
            name: casts[inx].name
        };
        castsArray.push(cast);
    }
    return castsArray;
}
module.exports = {
    formatTime: formatTime,
    convertToStarsArray: convertToStarsArray,
    convertToCastString: convertToCastString,
    convertToCastInfos: convertToCastInfos
}
