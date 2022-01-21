const wxapi = "//res.wx.qq.com/open/js/jweixin-1.4.0.js";
const qqapi = "//open.mobile.qq.com/sdk/qqapi.js?_bid=152";
const qzapi = "//qzonestyle.gtimg.cn/qzone/phone/m/v4/widget/mobile/jsbridge.js?_bid=339";

const requireJS = (url) => new Promise((resolve, reject) => {
    const head = document.head || (document.getElementsByTagName("head")[0] || document.documentElement);
    const node = document.createElement("script");
    node.onload = () => {
        resolve();
    };
    node.onerror = () => {
        reject();
    };
    node.async = true;
    node.src = url;
    head.appendChild(node);
});

const initWX = (options) => {
    // 无微信配置时
    if (!options.shareData || !options.nonceStr) {
        return;
    }

    requireJS(wxapi).then(() => {
        wx.config({
            // 开启调试模式时,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            debug: !!options.debug,
            // 后台返回之前获取的appId
            appId: options.appId,
            // 必填，生成签名的时间戳
            timestamp: options.timestamp,
            // 必填，生成签名的随机串
            nonceStr: options.nonceStr,
            // 必填，签名，见附录1
            signature: options.signature,
            // 必填，需要使用的JS接口列表，所有JS接口列表见附录3
            jsApiList: [
                "checkJsApi", // 检查api
                "onMenuShareTimeline", // 1.0分享到朋友圈
                "onMenuShareAppMessage", // 1.0 分享到朋友
                "updateAppMessageShareData", // 1.4 分享到朋友
                "updateTimelineShareData" // 1.4分享到朋友圈
            ]
        });

        // 页面加载完成后用户就有可能调用微信的分享，所以当页面ready 完后就加载
        wx.ready(() => {
            const commonShareData = {
                // 分享标题
                title: options.shareData.title,
                // 分享描述
                desc: options.shareData.desc,
                // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                link: options.shareData.link,
                // 分享图标
                imgUrl: options.shareData.imgUrl,
                success() {
                    // eslint-disable-next-line no-console
                    console.log("分享成功！");
                }
            };
            wx.onMenuShareTimeline(commonShareData); // 1.0
            wx.updateTimelineShareData(commonShareData); // 1.0
            wx.onMenuShareAppMessage(commonShareData); // 1.4
            wx.updateAppMessageShareData(commonShareData); // 1.4
        });
        // 微信预加载失败回调
        wx.error((res) => {
            // eslint-disable-next-line no-console
            console.log(res);
        });
    });
};

const initQQ = (options) => {
    const info = {
        title: options.shareData.title,
        desc: options.shareData.desc,
        share_url: options.shareData.link,
        image_url: options.shareData.imgUrl
    };
    function doQQShare() {
        try {
            window.mqq.data.setShareInfo(info);
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log("QQ分享失败！");
        }
    }
    if (window.mqq) {
        doQQShare();
    } else {
        requireJS(qqapi).then(() => {
            doQQShare();
        });
    }
};

const initQZ = (options) => {
    function doQZShare() {
        if (window.QZAppExternal && window.QZAppExternal.setShare) {
            const imageArr = [];
            const titleArr = [];
            const summaryArr = [];
            const shareURLArr = [];
            for (let i = 0; i < 5; i += 1) {
                imageArr.push(options.shareData.imgUrl);
                shareURLArr.push(options.shareData.link);
                titleArr.push(options.shareData.title);
                summaryArr.push(options.shareData.desc);
            }
            window.QZAppExternal.setShare(() => {
            }, {
                type: "share",
                image: imageArr,
                title: titleArr,
                summary: summaryArr,
                shareURL: shareURLArr
            });
        }
    }
    if (window.QZAppExternal) {
        doQZShare();
    } else {
        requireJS(qzapi).then(() => {
            doQZShare();
        });
    }
};

export const wxshare = (opts) => {
    const ua = navigator.userAgent;
    const isWX = ua.match(/MicroMessenger\/([\d\\.]+)/);
    isWX && initWX(opts);
};

export const qqshare = (opts) => {
    const ua = navigator.userAgent;
    const isQQ = ua.match(/QQ\/([\d\\.]+)/);
    isQQ && initQQ(opts);
};

export const qzshare = (opts) => {
    const ua = navigator.userAgent;
    const isQZ = ua.indexOf("Qzone/") !== -1;
    isQZ && initQZ(opts);
};

const share = (opts) => {
    wxshare(opts);
    qqshare(opts);
    qzshare(opts);
};

export default share;
