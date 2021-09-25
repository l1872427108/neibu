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
    if (status === '0' || status === '1' || status === '2' || status === '5') {
        return '解约';
    } else if (status === '3') {
        return '解约审核中';
    } else if (status === '4') {
        return '解约成功';
    }
}


/**
 *  @param {number} classStatus  0  1  2
 */
 export function classStatus (status) {
    if (status === '0') {
        return 'info';
    } else if (status === '1' || status === '4') {
        return 'success';
    } else if (status === '3' || status === '2') {
        return 'primary';
    } else if (status === '5') {
        return 'danger';
    }
}


export function payStatus (status) {
    if (status === '0') {
        return '未支付';
    } else if (status === '1') {
        return '已支付';
    } else if (status === '2') {
        return '支付中';
    }
}

export function payClass (status) {
    if (status === '0') {
        return 'info';
    } else if (status === '1') {
        return 'success';
    } else if (status === '2') {
        return 'primary';
    }
}

export function payMessage (status) {
    if (status === '0') {
        return '去支付';
    } else if (status === '1') {
        return '支付完成';
    } else if (status === '2') {
        return '支付中';
    }
}

export function payType (status) {
    if (status === '0') {
        return 'primary';
    } else if (status === '1') {
        return 'success';
    } else if (status === '2') {
        return 'danger';
    }
}
