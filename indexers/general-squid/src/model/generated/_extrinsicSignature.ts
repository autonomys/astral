import assert from "assert"
import * as marshal from "./marshal"

export class ExtrinsicSignature {
    private _address!: unknown | undefined | null
    private _signature!: unknown | undefined | null
    private _signedExtensions!: unknown | undefined | null

    constructor(props?: Partial<Omit<ExtrinsicSignature, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._address = json.address
            this._signature = json.signature
            this._signedExtensions = json.signedExtensions
        }
    }

    get address(): unknown | undefined | null {
        return this._address
    }

    set address(value: unknown | undefined | null) {
        this._address = value
    }

    get signature(): unknown | undefined | null {
        return this._signature
    }

    set signature(value: unknown | undefined | null) {
        this._signature = value
    }

    get signedExtensions(): unknown | undefined | null {
        return this._signedExtensions
    }

    set signedExtensions(value: unknown | undefined | null) {
        this._signedExtensions = value
    }

    toJSON(): object {
        return {
            address: this.address,
            signature: this.signature,
            signedExtensions: this.signedExtensions,
        }
    }
}
