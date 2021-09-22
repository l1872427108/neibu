/**
 * @param {number} status
 */
export function filterStatus (status) {
    if (status === '0') {
        return '未签约';
    } else if (status === '1') {
        return '已签约';
    } else if (status === '2') {
        return '签约中';
    } else if (status === '3') {
        return '解约审核中';
    } else if (status === '4') {
        return '解约成功';
    } else if (status === '5') {
        return '审核未通过';
    }
}


/**
 * @param {number} message
 */
 export function messageStatus (status) {
    if (status === '0') {
        return '签约';
    } else if (status === '1') {
        return '查看';
    } else if (status === '2') {
        return '签约审核中';
    } else if (status === '3') {
        return '查看';
    } else if (status === '5') {
        return '重新签约';
    }
}

/**
 *  @param {number} terminate  0  1  2
 */

export function terminateStatus (status) {
    if (status === '0' || status === '1' || status === '2') {
        return '解约';
    } else if (status === '3') {
        return '解约审核中';
    }
        return '解约成功';
}
