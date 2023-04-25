import {db} from "../db.js";
import jwt  from "jsonwebtoken";
export const getDrafts = (req,res)=>
{
    
    const q= req.query.cat ? "select * from drafts where cat=?"
    : "select * from drafts";

    db.query(q,[req.query.cat], (err,data)=>
    {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data)
    })
    
}

export const getDraft = (req, res) => {
    const q =
      "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN drafts p ON u.id = p.uid WHERE p.id = ? ";
  
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
  
      return res.status(200).json(data[0]);
    });
  };
  
  export const addDraft = (req, res) => {
    console.log('reached!!')
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q =
        "INSERT INTO drafts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)";
  
      const values = [
        req.body.title,
        req.body.desc,
        req.body.img,
        req.body.cat,
        req.body.date,
        userInfo.id,
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Draft has been created.");
      });
    });
  };
export const deleteDraft = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const DraftId = req.params.id;
    const q = "DELETE FROM drafts WHERE `id` = ? AND `uid` = ?";

    db.query(q, [DraftId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your Draft!");

      return res.json("Draft has been deleted!");
    });
  });
};

export const updateDraft = (req, res) => {
  
  const token = req.cookies.access_token;
  console.log(req.cookies)
  if (!token) return res.status(401).json("Not authenticated!");
  
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    
    const DraftId = req.params.id;
    const q =
      "UPDATE drafts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

    db.query(q, [...values, DraftId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Draft has been updated.");
    });
  });
};