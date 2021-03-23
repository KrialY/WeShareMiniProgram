import {PATH} from '../utils/util';

Component({

  behaviors: [],

  properties: {
    isToolShow: {
      type: Boolean,
      value: false
    },
    info: {
      type: Object,
      value: {}
    }
  },
  data: {
    src: ""
  }, // 私有数据，可用于模版渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    moved: function () { },
    detached: function () { },
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { }, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function() { 
    this.setData({
      src: PATH + this.properties.info.src
    })
    console.log(PATH + this.properties.info.src);
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { },
  },

  methods: {
    triggleShow() {
      const {isToolShow} = this.properties;
      this.setData({
        isToolShow: !isToolShow
      })
    },
    download() {
      wx.request({
        url: `http://www.krialy.com/api/download`,
        data: {
          fname: this.properties.info.src
        },
        success(res) {
          console.log(res);
          const { data } = res;
          const fs = wx.getFileSystemManager();
          const filePath = wx.env.USER_DATA_PATH + '/temp.jpg';

          fs.writeFile({
            filePath,
            data,
            encoding: 'binary',
            success: () => {
              console.log(filePath, "success");
              // this.setData({
              //   imgPath: filePath,
              // })
            }
          });
        }
      })
    }
  }

})