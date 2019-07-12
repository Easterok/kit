import {ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {EkitLetModule} from './let.module';

describe('EkitLetDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [EkitLetModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('Вывелся текст', () => {
        const text = component.text.nativeElement.textContent;

        expect(text).toBe('hello 12345, 12345, 12345');
    });

    it('Геттер вызвался 1 раз', () => {
        const counter = component.counter;

        expect(counter).toBe(1);
    });
});

@Component({
    template: `
        <div *ekitLet="getter as getter" #text>
            hello {{ getter }}, {{ getter }}, {{ getter }}
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestComponent {
    @ViewChild('text', {read: ElementRef, static: true}) readonly text: ElementRef;

    counter = 0;

    get getter(): string {
        this.counter += 1;

        return '12345';
    }
}
