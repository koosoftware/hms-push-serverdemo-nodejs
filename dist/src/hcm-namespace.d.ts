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
import { Messaging } from "./push/messaging";
import { Topic } from "./push/topic";
import { MessagingConfig } from "./push/modle/message";
import { TopicConfig } from "./push/modle/topic";
export declare class HcmNamespace {
    private authClient;
    private config;
    init(conf: HcmConfig): void;
    auth(): Promise<string>;
    messaging(conf?: MessagingConfig): HcmServiceNamespace<Messaging>;
    topic(tconf?: TopicConfig): HcmServiceNamespace<Topic>;
    private checkInit;
}
export interface HcmServiceNamespace<T> {
    [key: string]: T;
}
export interface HcmConfig {
    appId: string;
    appSecret: string;
    authUrl?: string;
    pushUrl?: string;
}
