import { AbstractModule } from '../../../core/abstract-module'
import type { Laundryroom } from '../types'

export class LaundryroomBillingInternalModule extends AbstractModule {
	public getModuleID(): string {
		return 'labrinth_billing_internal'
	}

	/**
	 * Get user's subscriptions
	 * GET /_internal/billing/subscriptions
	 */
	public async getSubscriptions(
		userId?: string,
	): Promise<Laundryroom.Billing.Internal.UserSubscription[]> {
		const params = userId ? `?user_id=${userId}` : ''

		return this.client.request<Laundryroom.Billing.Internal.UserSubscription[]>(
			`/billing/subscriptions${params}`,
			{
				api: 'labrinth',
				version: 'internal',
				method: 'GET',
			},
		)
	}

	/**
	 * Get available products for purchase
	 * GET /_internal/billing/products
	 */
	public async getProducts(): Promise<Laundryroom.Billing.Internal.Product[]> {
		return this.client.request<Laundryroom.Billing.Internal.Product[]>('/billing/products', {
			api: 'labrinth',
			version: 'internal',
			method: 'GET',
		})
	}

	/**
	 * Get Stripe customer information
	 * GET /_internal/billing/customer
	 */
	public async getCustomer(): Promise<unknown> {
		return this.client.request<unknown>('/billing/customer', {
			api: 'labrinth',
			version: 'internal',
			method: 'GET',
		})
	}

	/**
	 * Edit a subscription (change product, interval, cancel, etc.)
	 * PATCH /_internal/billing/subscription/{id}
	 */
	public async editSubscription(
		id: string,
		edit: Laundryroom.Billing.Internal.EditSubscriptionRequest,
		dry?: boolean,
	): Promise<Laundryroom.Billing.Internal.EditSubscriptionResponse | void> {
		const params = dry ? '?dry=true' : ''

		return this.client.request<Laundryroom.Billing.Internal.EditSubscriptionResponse | void>(
			`/billing/subscription/${id}${params}`,
			{
				api: 'labrinth',
				version: 'internal',
				method: 'PATCH',
				body: edit,
			},
		)
	}

	/**
	 * Get user's payment methods
	 * GET /_internal/billing/payment_methods
	 */
	public async getPaymentMethods(): Promise<unknown[]> {
		return this.client.request<unknown[]>('/billing/payment_methods', {
			api: 'labrinth',
			version: 'internal',
			method: 'GET',
		})
	}

	/**
	 * Initiate flow to add a new payment method
	 * POST /_internal/billing/payment_method
	 */
	public async addPaymentMethodFlow(): Promise<Laundryroom.Billing.Internal.AddPaymentMethodFlowResponse> {
		return this.client.request<Laundryroom.Billing.Internal.AddPaymentMethodFlowResponse>(
			'/billing/payment_method',
			{
				api: 'labrinth',
				version: 'internal',
				method: 'POST',
			},
		)
	}

	/**
	 * Edit a payment method (set as primary)
	 * PATCH /_internal/billing/payment_method/{id}
	 */
	public async editPaymentMethod(
		id: string,
		body: Laundryroom.Billing.Internal.EditPaymentMethodRequest,
	): Promise<void> {
		return this.client.request<void>(`/billing/payment_method/${id}`, {
			api: 'labrinth',
			version: 'internal',
			method: 'PATCH',
			body,
		})
	}

	/**
	 * Remove a payment method
	 * DELETE /_internal/billing/payment_method/{id}
	 */
	public async removePaymentMethod(id: string): Promise<void> {
		return this.client.request<void>(`/billing/payment_method/${id}`, {
			api: 'labrinth',
			version: 'internal',
			method: 'DELETE',
		})
	}

	/**
	 * Get payment history (charges)
	 * GET /_internal/billing/payments
	 */
	public async getPayments(userId?: string): Promise<Laundryroom.Billing.Internal.Charge[]> {
		const params = userId ? `?user_id=${userId}` : ''

		return this.client.request<Laundryroom.Billing.Internal.Charge[]>(`/billing/payments${params}`, {
			api: 'labrinth',
			version: 'internal',
			method: 'GET',
		})
	}

	/**
	 * Initiate a payment
	 * POST /_internal/billing/payment
	 */
	public async initiatePayment(
		request: Laundryroom.Billing.Internal.InitiatePaymentRequest,
	): Promise<Laundryroom.Billing.Internal.InitiatePaymentResponse> {
		return this.client.request<Laundryroom.Billing.Internal.InitiatePaymentResponse>(
			'/billing/payment',
			{
				api: 'labrinth',
				version: 'internal',
				method: 'POST',
				body: request,
			},
		)
	}

	/**
	 * Refund a charge (Admin only)
	 * POST /_internal/billing/charge/{id}/refund
	 */
	public async refundCharge(
		id: string,
		refund: Laundryroom.Billing.Internal.RefundChargeRequest,
	): Promise<void> {
		return this.client.request<void>(`/billing/charge/${id}/refund`, {
			api: 'labrinth',
			version: 'internal',
			method: 'POST',
			body: refund,
		})
	}

	/**
	 * Credit subscriptions (Admin only)
	 * POST /_internal/billing/credit
	 */
	public async credit(request: Laundryroom.Billing.Internal.CreditRequest): Promise<void> {
		return this.client.request<void>('/billing/credit', {
			api: 'labrinth',
			version: 'internal',
			method: 'POST',
			body: request,
		})
	}
}
