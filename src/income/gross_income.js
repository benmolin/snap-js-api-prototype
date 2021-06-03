export class GrossIncome {
    constructor(inputs) {
        this.monthly_job_income = inputs.monthly_job_income;
        this.monthly_non_job_income = inputs.monthly_non_job_income;
        this.child_support_payments_treatment = inputs.child_support_payments_treatment;
        this.court_ordered_child_support_payments = inputs.court_ordered_child_support_payments;
        this.unemployment_benefits = inputs.unemployment_benefits;
        this.noneligible_monthly_income = inputs.noneligible_monthly_income;
        this.noneligible_proration = inputs.noneligible_proration;
    }

    calculate() {
        const explanation = [];



        const gross_income_intro = (
            'We start with calculating gross income. We find the household\'s gross income by adding up monthly income from both job and non-job sources.'
        );
        explanation.push(gross_income_intro);

        // JOB AND NONJOB
        var monthly_income = this.monthly_job_income + this.monthly_non_job_income;

        const gross_income_math = (
            `$${this.monthly_job_income} monthly job income + ` +
            `$${this.monthly_non_job_income} monthly non-job income = ` +
            `$${monthly_income} gross income`
        );
        explanation.push(gross_income_math);

        // NON-CITIZEN
        if (this.noneligible_monthly_income != 0){

            const eligible_income = monthly_income - this.noneligible_monthly_income;
            const noneligible_gross_explanation = (
                `As there are ineligible non-citizens in the household, we will need to prorate their income. This household has:<br><br>` +

                `$${this.noneligible_monthly_income} income from ineligible members + ` +
                `$${eligible_income} income from eligible members = ` +
                `$${monthly_income} gross income`
                
            );
            explanation.push(noneligible_gross_explanation);

            monthly_income = Math.round(eligible_income + this.noneligible_monthly_income * this.noneligible_proration);
            const noneligible_proration_explanation = (
                `We will prorate the ineligible members\' income by the proportion of the household that is eligible, ${Math.round(this.noneligible_proration * 100)}%. <br><br>` +

                `$${this.noneligible_monthly_income} × ${Math.round(this.noneligible_proration * 100)}% prorated income from ineligible members + ` +
                `$${eligible_income} income from eligible members = ` +
                `$${monthly_income} prorated gross income`
                
            );
            explanation.push(noneligible_proration_explanation);  

        }
        

        // UNEMPLOYMENT
        if (this.unemployment_benefits){

            const unemployment_benefits_explanation = (
                'The current $300 weekly increase to unemployment benefits ' +
                'are counted as a gross income exclusion. The gross income is ' +
                'reduced by $1200 to exclude the additional unemployment benefits.<br><br>' +

                `$${monthly_income} gross income - ` +
                `$1200 excluded income = ` +
                `$${monthly_income - 1200} adjusted gross income`
            );
            explanation.push(unemployment_benefits_explanation);
            monthly_income = monthly_income - 1200;
        };

        // CHILD SUPPORT
        if ((this.child_support_payments_treatment === 'EXCLUDE') & (this.court_ordered_child_support_payments != 0)){
            const child_support_payments_explanation = (
                'In this state, court-ordered child support payments are ' +
                'counted as a gross income exclusion. The gross income is ' +
                'adjusted to exclude monthly court-ordered child support:'
            );
            explanation.push(child_support_payments_explanation);
    
            const monthly_income_minus_child_support = (
                monthly_income - this.court_ordered_child_support_payments
            );
    
            const child_support_payments_math = (
                `$${monthly_income} gross income - ` +
                `$${this.court_ordered_child_support_payments} court-ordered child support = ` +
                `$${monthly_income_minus_child_support} adjusted gross income`
            );
            explanation.push(child_support_payments_math);
            monthly_income = monthly_income_minus_child_support;
        }

        explanation.push(`Gross Income: <strong>$${monthly_income}</strong>`);

        return {
            'name': 'Gross Income',
            'result': monthly_income,
            'explanation': explanation,
            'sort_order': 0,
            'type': 'income',
        };
    }
}