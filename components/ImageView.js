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
    },
    isPreviewShow: {
      type: Boolean,
      value: false
    }
  },
  data: {
    src: "",
    isImageDownloaded: false
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
    openPreviewShow() {
      this.setData({
        isPreviewShow: true
      })
    },
    closePreviewShow() {
      this.setData({
        isPreviewShow: false
      })
    },
    download() {
      // krialy.com/static/upload/
      wx.showLoading({
        title: '下载中',
        mask: true
      });
      new Promise((resolve, reject) => {
        setTimeout(() => {
          reject("请求超时");
        }, 7000);
        wx.downloadFile({
          url:`${PATH}${this.properties.info.src}`,
          success(res) {
            console.log(res);
            if (res.statusCode === 200) {
              resolve(res.tempFilePath);
            }
          },
          fail(res) {
            reject(res);
          }
        });
      }, (info) => {
        console.log(info);
        wx.showToast({
          title: '保存失败',
          icon: 'none',
          duration: 2000
        });
      }).then(data => {
        return new Promise((resolve, reject) => {
          let img = data;
          setTimeout(() => {
            reject("写入图片超时");
          }, 2000);
          wx.saveImageToPhotosAlbum({
            filePath: img,
            success(res) {
              resolve(res);
            },
            fail(res) {
              reject(res);
            }
          });
        })
      }).then(() => {
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000
        });
      }, (info) => {
        console.log(info);
        wx.showToast({
          title: '保存失败',
          icon: 'none',
          duration: 2000
        });
      }) 
    }
  }

})