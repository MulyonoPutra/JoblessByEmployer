import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
    name: 'rangeDate',
    standalone: true,
})
export class RangeDatePipe implements PipeTransform {
    transform(value: string): string {
        if (!value) return '';

        const [startDateStr, endDateStr] = value.split(',');

        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);

        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
        };

        const formattedStartDate = startDate.toLocaleDateString(undefined, options);
        const formattedEndDate = endDate.toLocaleDateString(undefined, options);

        return `${formattedStartDate} - ${formattedEndDate}`;
    }
}
