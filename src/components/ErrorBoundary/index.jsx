import { Component } from "react";
import { TranslateContext } from "../TranslateProvider";

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }


    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <TranslateContext.Consumer>
                {
                    (props) => {
                        const { t } = props
                        return this.props.render || <h1 className="flex items-center justify-center h-[500px]">
                            {t('Sorry! something wrong')}
                        </h1>
                    }
                }
            </TranslateContext.Consumer>
        }

        return this.props.children;
    }
}