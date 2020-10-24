import * as React from "react";
import { Query as ApolloQuery } from "react-apollo";

export interface QueryProps {
    query: any;
    type?: 'object' | 'array';
    variables?: any;
    loading?: React.ReactNode | string;
    nodata?: React.ReactNode | string;
    error?: (e: any) => React.ReactNode | string;
    onCompleted?: () => void;
    render: (data: any, meta?: any) => any;
}

export class Query extends React.Component<QueryProps, any> {
    render() {
        const { query, variables, render, type = 'array', nodata, onCompleted } = this.props;
        return <>
            <ApolloQuery query={query} variables={variables} onCompleted={onCompleted}>
                {(({ data, loading, error = null }) => {
                    if (loading) {
                        return this.props.loading || '';
                    }

                    if (error) {
                        console.error('Failed to load section', error);
                        return this.props.error ?
                            this.props.error(error) :
                            <p>Something went wrong. Please try again.</p>;
                    }

                    if (!data) {
                        return nodata ? nodata : <p>No data</p>;
                    }

                    const values = Object.values(data);
                    const value = values[0];
                    const metadata = values[1];
                    return render((type === 'array' ? value : (value[0] ?? {})), metadata);
                })}
            </ApolloQuery>
        </>;
    }
}
