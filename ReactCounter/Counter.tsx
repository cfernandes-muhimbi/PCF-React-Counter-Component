import * as React from 'react';

export interface CounterState {
  count: number;
  animating: boolean; // Indicates if an animation is currently running
  animationClass: string; // CSS class for the animation effect
}

export interface ICounterProps {
  initialCount: number;
  onCountChange: (count: number) => void;
}

export class Counter extends React.Component<ICounterProps,CounterState> {
  timeoutId: ReturnType<typeof setTimeout> | null = null;
  constructor(props: ICounterProps) {
    super(props);
    this.state = {
      count: props.initialCount || 0,
      animating: false,
      animationClass: '',
    };
  }
  componentDidUpdate(prevProps: ICounterProps): void {
    if (prevProps.initialCount !== this.props.initialCount) {
      // If the initialCount prop has changed, update the state
      this.setState({ count: this.props.initialCount });
    }
  }
  animateAndSetState = (newCount: number, animationClass: string): void => {
    // Set animating state and apply animation class
    this.setState({ animating: true, animationClass }, () => {
      // Clear any previous timeout to avoid overlapping animations
      if (this.timeoutId) clearTimeout(this.timeoutId);
 
      // Set a timeout to update the state after animation completes
      this.timeoutId = setTimeout(() => {
        this.setState({ count: newCount, animating: false, animationClass: '' }); // Reset animation state
        this.props.onCountChange(newCount); // Notify parent of the updated count
      }, 600); // Duration matches the CSS animation duration
    });
  };

  increment = (): void => {
    this.animateAndSetState(this.state.count + 1, 'flip-right');
  };

  decrement = (): void => {
    this.animateAndSetState(this.state.count - 1, 'flip-left');
  };

  reset = (): void => {
    this.animateAndSetState(0, 'rotate-180');
  };
  public render(): React.ReactNode {
    return (
      <div>
      <p className={`count ${this.state.animationClass}`}> {this.state.count}</p>
      <div>
      <div className="buttons">
      <button onClick={this.increment}>+</button>
      <button onClick={this.decrement}>-</button>
      <button onClick={this.reset}>R</button>
      </div>
      </div>   
      </div>
    )
  }
}
