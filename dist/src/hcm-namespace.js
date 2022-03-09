"use strict";
/*!
 * Copyright 2020. Huawei Technologies Co., Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const messaging_1 = require("./push/messaging");
const topic_1 = require("./push/topic");
const auth_1 = require("./auth/auth");
class HcmNamespace {
    init(conf) {
        this.config = conf;
        this.authClient = new auth_1.AuthClient(conf);
    }
    auth() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.checkInit()) {
                return;
            }
            let token = yield this.authClient.refreshToken();
            return token;
        });
    }
    messaging(conf) {
        if (!this.checkInit()) {
            return;
        }
        if (!conf) {
            conf = {
                devappid: this.config.appId
            };
        }
        conf.devappid = conf.devappid ? conf.devappid : this.config.appId;
        conf.messagingUrl = conf.messagingUrl ? conf.messagingUrl : this.config.pushUrl;
        let messaging = new messaging_1.Messaging(conf, this.authClient);
        return { messaging };
    }
    topic(tconf) {
        if (!this.checkInit()) {
            return;
        }
        if (!tconf) {
            tconf = {
                devappid: this.config.appId
            };
        }
        tconf.devappid = tconf.devappid ? tconf.devappid : this.config.appId;
        tconf.topicUrl = tconf.topicUrl ? tconf.topicUrl : this.config.pushUrl;
        let topic = new topic_1.Topic(tconf, this.authClient);
        return { topic };
    }
    checkInit() {
        if (!this.config || !this.config.appId || !this.config.appSecret) {
            throw new Error("appId or appsecret is null, please init Hcm first!");
        }
        return true;
    }
}
exports.HcmNamespace = HcmNamespace;
//# sourceMappingURL=hcm-namespace.js.map