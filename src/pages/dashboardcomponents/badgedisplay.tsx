import React, { useContext, useState } from "react";
import { UserContext } from "@/index.tsx";
import { BadgeSchema } from "@/typings/database";
import { askForBadgeData } from "@/utils/client/askforassets.ts";

export const CSS = {
  Container: 'badge-list',
  Name: "badge-name",
  Entry: "badge-entry",
  Image: {
    clazz: "badge-icon",
    size: "40px"
  },
  Desc: "badge-desc",
  Date: "badge-date"
};

export default (): React.JSX.Element => {
  const user = useContext(UserContext);
  
  const userBadgeDatas = (user.data?.badges ?? []);
  
  const badgeData_p: Promise<BadgeSchema>[] = userBadgeDatas.map(el => askForBadgeData(el.badge_id))
  
  const badgeRows: React.ReactElement[] = [];
  
  for (let i = 0; i < userBadgeDatas.length; i++) {
    let { date_earned } = userBadgeDatas[i];
    
    const [ name, setName ] = useState("");
    const [ desc, setDesc ] = useState("");
    const [ imgUrl, setImgUrl ] = useState("");
    
    badgeData_p[i].then(it => {
      setName(it.name);
      setDesc(it.desc);
      it.img && setImgUrl(it.img);
    });
    
    const formatter = new Intl.DateTimeFormat()
    const badgeRow = (
      <div className={ CSS.Entry }>
        <img className={ CSS.Image.clazz } width={ CSS.Image.size } height={ CSS.Image.size }
             src={ imgUrl } />
        <div className={ CSS.Name }>{ name }</div>
        <div className={CSS.Desc}>{ desc }</div>
        <div className={CSS.Date}>{ formatter.format(date_earned) }</div>
      </div>
    );
    
    badgeRows.push(badgeRow);
  }
  
  return (
    <div id="badgedisplay" className={CSS.Container}>
      { badgeRows }
    </div>
  );
}