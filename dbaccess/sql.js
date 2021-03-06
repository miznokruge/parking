module.exports.sqls = {
    //下标为1-10000的用于select语句
    '1': ' * from tbUserInfo where iPhoneNum = ?',
    '2': ' * from tbUserPasswd where iPhoneNum = ?',
    '3': 'szLiensePlate from tbUserInfo where iPhoneNum = ?',
    '4': ' * from tbParkingSpaceInfo where iPhoneNum = ?',
    //下标10000-20000的用于update语句
    '10001': ' tbUserPasswd set szPasswd = ? where iPhoneNum = ?',
    '10002': ' tbUserInfo set szUserName = ?, szRealName = ?, szMail = ?, szLiensePlate = ?, szAddress = ?, szModels = ?, szBankCard = ? where iPhoneNum = ?', 
    '10003': ' tbUserInfo set szLiensePlate = ? where iPhoneNum = ?',
    '10004': ' tbParkingSpaceInfo set iDelete = 1 where iPhoneNum = ? and iSpaceID = ?',
    '10005': ' tbParkingSpaceInfo set szParkingNum = ?, iParkingType = ?, iParkingNature = ? where iPhoneNum = ? and iSpaceID = ?', 
    //下标20000-30000的用于insert语句
    '20001': 'into tbUserInfo (iPhoneNum, tRegisterTime) values(?, now())',
    '20002': 'into tbUserPasswd (iPhoneNum, szPasswd) values(?, ?)',
    '20003': 'into tbParkingSpaceInfo(iPhoneNum, iCommunityID, szParkingNum, iParkingType, iParkingNature) values(?, ?, ?, ?, ?)',
    //下标30000-40000的用于delete语句
    //下标40000-50000的用于replace语句
};
