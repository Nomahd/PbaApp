export const ynh5radioSchedule = [
  makeScheduleObject('IBCラジオ［岩手］', '（月）～（土）', '5:15 AM'),
  makeScheduleObject('YBCラジオ［山形］', '（月）～（金）', '5:05 AM'),
  makeScheduleObject('FBCラジオ［福井］', '（月）～（金）', '6:40 AM', '（土）', '5:45 AM'),
  makeScheduleObject('東海ラジオ［中京広域］', '（月）～（土）', '5:40 AM'),
  makeScheduleObject('ABCラジオ［近畿広域］', '（月）～（金）', '4:45 AM'),
  makeScheduleObject('RCCラジオ［広島］', '（月）～（土）', '5:05 AM'),
  makeScheduleObject('四国放送ラジオ［徳島］', '（月）～（金）', '5:15 AM','（土）', '6:00 AM'),
];

export const ynh10radioSchedule = [
  makeScheduleObject('ぎふちゃんラジオ', '（月）～（土）', '6:10 AM'),
  makeScheduleObject('エフエム山陰［鳥取・島根］', '（月）～（金）', '6:15 AM'),
  makeScheduleObject('KRYラジオ［山口］', '（月）～（土）', '5:15 AM'),
  makeScheduleObject('MRTラジオ［宮 崎］', '（月）～（土）', '5:10 AM'),
];

export const ynh15radioSchedule = [
  makeScheduleObject('BCラジオ［北海道］', '（日）', '6:20 AM'),
  makeScheduleObject('TBCラジオ［宮 城］', '（土）', '5:10 AM'),
  makeScheduleObject('rfcラジオ福島', '（日）', '8:00 AM'),
  makeScheduleObject('IBS茨城放送', '（日）', '7:10 AM'),
  makeScheduleObject('CRT栃木放送', '（日）', '6:15 AM'),
  makeScheduleObject('文化放送［関東広 域］', '（日）', '5:35 AM'),
  makeScheduleObject('KNBラジオ［富 山］', '（日）', '7:00 AM'),
  makeScheduleObject('MROラジオ［石 川］', '（日）', '6:35 AM'),
  makeScheduleObject('SBCラジオ［長 野］', '（日）', '7:10 AM'),
  makeScheduleObject('東海ラジオ［中京 広域］', '（月）', '2:00 AM'),
  makeScheduleObject('南海放送ラジオ ［愛媛］', '（日）', '7:05 AM'),
  makeScheduleObject('四国放送ラジオ ［徳島］', '（日）', '6:45 AM'),
  makeScheduleObject('RKKラジオ［熊 本］', '（日）', '5:45 AM'),
  makeScheduleObject('NBCラジオ［長 崎］', '（日）', '6:40 AM'),
  makeScheduleObject('ラジオ沖縄', '（土）', '6:45 AM'),
];

export const llTvSchedule = [
  makeScheduleObject('HBCテレビ [北海道]', '（日）', '4:45 AM'),
  makeScheduleObject('ATV [青森]', '（土）', '5:00 AM'),
  makeScheduleObject('FTV福島テレビ', '（日）', '5:30 AM'),
  makeScheduleObject('BSNテレビ[新潟]', '（土）', '5:15 AM'),
  makeScheduleObject('群馬テレビ', '（日）', '7:00 AM'),
  makeScheduleObject('チバテレ', '（土）', '7:00 AM'),
  makeScheduleObject('テレ玉[埼玉]', '（土）', '8:00 AM'),
  makeScheduleObject('tvk [神奈川]', '（日）', '8:30 AM'),
  makeScheduleObject('Daiichi TV [静岡]', '（土）', '5:00 AM'),
  makeScheduleObject('BBCびわ湖放送', '（土）', '8:00 AM'),
  makeScheduleObject('サンテレビ[兵庫・大阪]', '（日）', '7:00 AM'),
  makeScheduleObject('KBS京都TV', '（土）', '6:30 AM'),
  makeScheduleObject('OTV沖縄テレビ', '（土）', '5:30 AM'),
];



function makeScheduleObject(station, date1, time1, date2 = null, time2 = null) {
  return {station, date1, time1, date2, time2};
}
