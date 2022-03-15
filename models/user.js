const Sequelize = require('sequelize');
const { SET_DEFERRED } = require('sequelize/dist/lib/deferrable');

module.exports = ((sequelize,DataTypes)=>{
    return sequelize.define('user',{
        no:{
          type: Sequelize.INTEGER(11).UNSIGNED,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        userid:{
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
        },
        pwd:{
            type: Sequelize.STRING(30),
            allowNull: false, // 카카오 로그인은 비번 필요없으니,,
        },
        email:{
          type: Sequelize.STRING(40),
          allowNull: false,
        }
        // provider :{ // 뭐로 로그인 했는지 : 카카오, 로컬,,
        //     type: Sequelize.STRING(10),
        //     allowNull: false,
        //     defaultValue: 'local',
        // },

    },{
        timestamps:true,
        paranoid : true, // 삭제일 (복구용)
    })
})