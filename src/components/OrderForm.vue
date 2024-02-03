<script>

import { mapActions } from 'pinia';
import orderStore from '@/stores/orderStore';

import { Form, Field, ErrorMessage, configure, defineRule } from 'vee-validate';
import { setLocale, localize } from '@vee-validate/i18n';
import { required, email } from '@vee-validate/rules';

import zh_TW from '@vee-validate/i18n/dist/locale/zh_TW.json';

defineRule('required', required);
defineRule('email', email);

configure({
    generateMessage: localize({ zh_TW }),
    validateOnInput: true,
});

setLocale('zh_TW');

//

export default {

    components: { VForm: Form, VField: Field, ErrorMessage },

    props: [ 'length' ],

    data() {

        return {

            config: { 'name': '名字', 'address': '地址', 'email': '信箱' }

        }

    },

    methods: {

        ...mapActions(orderStore, ['submit']),

        phone(value) {

            if (!/^09[\d]{8}$/.test(value)) { return '電話號碼格式不正確' }
            return true;

        },

        tweakMessage(msg, key) { return msg.replace(/^\w+\s/, () => this.config[key]) }

    },

};

</script>

<template>

<div class="row justify-content-center">
    <div class="col-md-6">
        <div class="card p-5">
            <VForm v-slot="{ errors, resetForm }" @submit="submit">
                <div class="mb-3">
                    <label for="name" class="form-label">
                    <span class="text-danger">*</span>
                    收件人姓名</label>
                    <VField id="name" type="text" name="name" class="form-control mb-3"
                            :class="{ 'is-invalid': errors['name'] }"
                            rules="required">
                    </VField>
                    <ErrorMessage name="name" v-slot="{ message }">
                    <span class="invalid-feedback">{{ tweakMessage(message, 'name') }}</span>
                    </ErrorMessage>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">
                    <span class="text-danger">*</span>
                    收件人信箱</label>
                    <VField id="email" type="email" name="email" class="form-control mb-3"
                            :class="{ 'is-invalid': errors['email'] }"
                            rules="required|email">
                    </VField>
                    <ErrorMessage name="email" v-slot="{ message }">
                    <span class="invalid-feedback">{{ tweakMessage(message, 'email') }}</span>
                    </ErrorMessage>
                </div>
                <div class="mb-3">
                    <label for="tel" class="form-label">
                    <span class="text-danger">*</span>
                    收件人電話</label>
                    <VField id="tel" type="tel" name="tel" class="form-control mb-3"
                            :class="{ 'is-invalid': errors['tel'] }"
                            :rules="phone"></VField>
                    <ErrorMessage class="invalid-feedback" name="tel"></ErrorMessage>
                </div>
                <div class="mb-3">
                    <label for="address" class="form-label">
                    <span class="text-danger">*</span>
                    收件人地址</label>
                    <VField id="address" type="text" class="form-control mb-3" name="address"
                            :class="{ 'is-invalid': errors['address'] }"
                            rules="required"></VField>
                    <ErrorMessage name="address" v-slot="{ message }">
                    <span class="invalid-feedback">{{ tweakMessage(message, 'address') }}</span>
                    </ErrorMessage>
                </div>
                <div class="mb-5">
                    <label for="message" class="form-label">留言</label>
                    <VField id="message" class="form-control mb-3" name="message" as="textarea"></VField>
                </div>
                <button type="submit" class="btn btn-secondary" :disabled="!length">送出</button>
            </VForm>
        </div>
    </div>
</div>

</template>